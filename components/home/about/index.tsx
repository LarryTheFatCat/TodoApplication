import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

const LandingAbout: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold pt-5">
        About <span className="text-blue-500">Task</span>
        <span className="text-black">Flow</span>
      </h1>
      <div className="p-5 grid md:grid-cols-3 gap-5">
        <Card className="transition-all hover:translate-y-5 hover:drop-shadow-2xl">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">
              Empowering your{" "}
              <span className="text-blue-500 underline">productivity</span>
            </h1>
          </CardHeader>
          <Divider className="w-10/12 mx-auto" />
          <CardBody className="p-5">
            <p>
              {" "}
              At TaskFlow, we believe that effective task management is the key
              to success. Our mission is to provide individuals and teams with
              an intuitive and powerful tool to organize their tasks, prioritize
              their goals, and track progress effortlessly. Whether you’re
              managing daily tasks, personal projects, or large-scale team
              assignments.{" "}
            </p>
          </CardBody>
        </Card>
        <Card className="mt-5 transition-all hover:translate-y-5 hover:drop-shadow-2xl">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">
              <span className="text-blue-500">
                <em>Simple</em>.
              </span>{" "}
              <span className="text-blue-600 underline">Efficient.</span>{" "}
              <span className="text-blue-700 font-extrabold">Powerful.</span>
            </h1>
          </CardHeader>
          <Divider className="w-10/12 mx-auto" />
          <CardBody className="p-5">
            <p>
              {" "}
              TaskFlow is designed to help you organize, prioritize, and achieve
              your daily goals with ease. Whether you’re juggling multiple
              projects or simply need a better way to manage your daily tasks,
              TaskFlow transforms how you stay organized.{" "}
            </p>
          </CardBody>
        </Card>
        <Card className="mt-10 transition-all hover:translate-y-5 hover:drop-shadow-2xl">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">The Impact We Create</h1>
          </CardHeader>
          <Divider className="w-10/12 mx-auto" />
          <CardBody className="p-5">
            <p>
              {" "}
              TaskFlow isn’t just another task management tool—it's a
              productivity solution designed to help you make the most of every
              day. Our app is trusted by individuals and teams alike to simplify
              complex workflows, track progress, and maintain focus on important
              tasks. The impact we’ve seen is profound—users report reduced
              stress, increased productivity, and a sense of achievement after
              each completed task.{" "}
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default LandingAbout;