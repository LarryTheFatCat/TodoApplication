import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { auth, db } from "../../utils/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import AllTaskIcon from "../../public/AllTaskIcon"; // Ensure correct import
import ActiveTaskIcon from "../../public/ActiveTaskIcon";
import { CheckIcon } from "../../public/CheckIcon";
import { TaskList, TaskState } from "../../types/Types";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [priorityState, setPriorityState] = useState<string>("");
  const router = useRouter();
  const [task, setTask] = useState<TaskState>({
    task: "",
    priority: "",
  });
  const [errorState, setErrorState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskList[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCheckboxChange = async (taskId: string) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
    setTimeout(async () => {
      setCheckedTasks((prev) => ({
        ...prev,
        [taskId]: true,
      }));
      // Update the completed field in the Firebase database
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const taskRef = doc(db, "users", uid, "tasks", taskId);
        await setDoc(taskRef, { completed: true }, { merge: true });
      }
    }, 500); // 0.5 seconds delay
  };

  useEffect(() => {
    // get name from firebase db
    const fetchUserData = async () => {
      const user = auth.currentUser;
      // if user exist, set name
      if (user) {
        const uid = user.uid;
        const documentReference = doc(db, "users", uid);
        const documentSnapshot = await getDoc(documentReference);
        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          console.log(data);
          if (data) {
            setName(data.fullname);
          }
        }
      }
    };
    if (priorityState == "") {
      setPriorityState("Set Priority");
    }
    fetchUserData();
    getTasks();
  }, []);

  const addTask = async () => {
    setLoadingState(true);
    if (task.task !== "" || task.priority !== "") {
      console.log(task);
      setErrorState(false);
      try {
        // add task to firestore db
        const user = auth.currentUser;
        const uid = user?.uid;
        // if there is a user, then we can simply proceed
        if (uid) {
          // now add the task to the collection of users --> task
          let collectionRef = collection(db, "users", uid, "tasks");
          await addDoc(collectionRef, {
            task: task.task,
            priority: task.priority,
            completed: false,
          });
          setLoadingState(false);
        } else {
          // no occurrence of user, redirect to login
          setLoadingState(false);
          router.push("/login");
        }
      } catch (e) {
        setLoadingState(false);
        // display the error that exists if something does happen non-user related
        alert(e);
      }
    } else {
      // this occurs if the input doesn't match standards, then we just return an error
      // it triggers errorMessage located at the input component
      setErrorState(true);
      setLoadingState(false);
    }
  };
  const getTasks = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        // get the collection reference
        const collectionReference = collection(db, "users", uid, "tasks");
        // get the documents from the collection
        const querySnapshot = await getDocs(collectionReference);
        // log the data to the console
        let tasks: TaskList[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as TaskList;
          if (!data.completed) {
            // Filter out completed tasks
            tasks.push({ ...data, id: doc.id });
          }
        });
        setTasks(tasks);
        // window.location.reload();
        console.log(tasks);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <ProtectedRoute>
        <div className="text-center">
          <h1 className="pt-10 text-7xl text-center font-semibold text-blue-500">
            <span className="relative">
              <span
                className="text-blue-500"
                style={{ textShadow: "0 2px 2px rgba(0, 0, 0, 0.5)" }}
              >
                Welcome back,{" "}
              </span>
              <span
                className="text-black"
                style={{ textShadow: "0 2px 2px rgba(0, 0, 0, 0.5)" }}
              >
                {name}!
              </span>
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-self-center gap-10 pt-8">
            <Chip
              className="mx-auto"
              color="primary"
              variant="shadow"
              classNames={{
                base: "border-small border-blue-700 shadow-md shadow-blue-500",
                content: "drop-shadow shadow-black text-white",
              }}
              startContent={<AllTaskIcon />}
            >
              <span className="font-semibold">All Tasks</span>
            </Chip>
            <Chip
              className="mx-auto"
              color="secondary"
              variant="shadow"
              classNames={{
                base: "border-small border-purple-800 shadow-md shadow-purple-500",
                content: "drop-shadow shadow-black text-white",
              }}
              startContent={<ActiveTaskIcon />}
            >
              <span className="font-semibold">Active Tasks</span>
            </Chip>
            <Chip
              color="success"
              className="mx-auto"
              variant="shadow"
              classNames={{
                base: "border-small border-green-700 shadow-md shadow-green-500",
                content: "drop-shadow shadow-black text-white",
              }}
              startContent={<CheckIcon />}
            >
              <span className="font-semibold">Completed Tasks</span>
            </Chip>
          </div>
          <Card className="w-1/2 mx-auto mt-28">
            <CardHeader className="grid grid-cols-2 md:grid-cols-2 md:gap-20">
              <Input
                fullWidth
                placeholder="Enter task"
                variant="faded"
                color="primary"
                label="Task"
                isClearable
                value={task.task}
                isInvalid={errorState}
                errorMessage="Oops! Task cannot be empty!"
                onChange={(e) => setTask({ ...task, task: e.target.value })}
                className="rounded-l-md rounded-r-none"
              />
              <div className="grid grid-cols-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      color={
                        task.task === ""
                          ? "secondary"
                          : task.priority === "High"
                          ? "danger"
                          : task.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {task.priority || "Set Priority"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Priority"
                    onAction={(key) =>
                      setTask({ ...task, priority: key as string })
                    }
                  >
                    <DropdownItem color="danger" key="High">
                      High
                    </DropdownItem>
                    <DropdownItem color="warning" key="Medium">
                      Medium
                    </DropdownItem>
                    <DropdownItem color="success" key="Low">
                      Low
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button
                  isLoading={loadingState}
                  onPress={addTask}
                  color="primary"
                  variant="solid"
                >
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              {tasks.map(
                (task) =>
                  !checkedTasks[task.id] && (
                    <div
                      key={task.id}
                      className="flex flex-row justify-between p-2 border-b border-gray-300"
                      onClick={() => console.log(task.id)}
                    >
                      <p className="text-lg font-semibold">{task.task}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid col-span-1">
                          <Checkbox
                            isSelected={checkedTasks[task.id]}
                            onChange={() => handleCheckboxChange(task.id)}
                          />
                        </div>
                        <div className="grid col-span-1">
                          <Tooltip
                            content={task.priority}
                            showArrow
                            color={
                              task.priority == "High"
                                ? "danger"
                                : task.priority == "Medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            <div
                              className={`w-3 h-3 self-center ${
                                task.priority == "High"
                                  ? "bg-red-500"
                                  : task.priority == "Medium"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }  rounded-full`}
                            ></div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </CardBody>
          </Card>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default HomePage;
