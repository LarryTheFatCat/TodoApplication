import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";
import React from "react";
const LandingTestimonials: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold pt-10">
        Testimonials About Our App!
      </h1>
      <Card className="w-10/12 mx-auto border-l-5 border-l-blue-500 transition-all hover:translate-y-[-0.8rem] mt-5">
        <CardHeader>
          <h3 className="text-xl font-semibold">
            "A Game-Changer for My Productivity!"
          </h3>
        </CardHeader>
        <Divider className="w-10/12 mx-auto" />
        <CardBody>
          "TaskFlow has completely transformed how I manage my tasks. The app is
          super easy to use, and I love the way it helps me stay organized. I
          can quickly prioritize tasks, set reminders, and track my progress
          throughout the day. As someone with a busy schedule, I no longer feel
          overwhelmed by my to-do list. I can confidently say that TaskFlow has
          made me more productive and less stressed!"
        </CardBody>
        <CardBody>
          <User name="Sara L." description="Project Manager" />
        </CardBody>
      </Card>
      <div className="grid md:grid-cols-2">
        <Card className="w-10/12 mx-auto border-l-5 border-l-red-500 transition-all hover:translate-y-[-0.8rem] mt-5">
          <CardHeader>
            <h3 className="text-xl font-semibold">
              "Perfect for Both Personal and Professional Use!"
            </h3>
          </CardHeader>
          <Divider className="w-10/12 mx-auto" />
          <CardBody>
            "I’ve used many task management tools before, but TaskFlow is by far
            the best. It's simple, intuitive, and versatile—ideal for managing
            both my personal and professional tasks. The collaboration features
            have been a lifesaver for my team, and the ability to visualize
            progress on tasks keeps everyone motivated. I highly recommend
            TaskFlow to anyone looking for a powerful, yet easy-to-use task
            manager!"
          </CardBody>
          <CardBody>
            <User name="Mark D." description="Small Business Owner" />
          </CardBody>
        </Card>
        <Card className="w-10/12 mx-auto border-l-5 border-l-green-500 transition-all hover:translate-y-[-0.8rem] mt-5">
          <CardHeader>
            <h3 className="text-xl font-semibold">
              "Keeps Me on Track and Focused!"
            </h3>
          </CardHeader>
          <Divider className="w-10/12 mx-auto" />
          <CardBody>
            "As a freelancer, managing multiple projects can get chaotic.
            TaskFlow has been my go-to solution for staying on top of deadlines,
            setting priorities, and ensuring that I don’t forget any important
            details. I love the clean design, and the notifications keep me on
            track without being overwhelming. It’s the best tool for staying
            focused and organized—it's truly a productivity booster!"
          </CardBody>
          <CardBody>
            <User name="Emily W." description="Freelance Writer" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LandingTestimonials;
