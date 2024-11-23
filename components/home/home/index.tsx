import { Button } from "@nextui-org/react";

export default function LandingHome() {
  return (
    <div className="px-10">
      <div className="bg-foreground-200 rounded-2xl h-[95vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl text-center font-extrabold text-blue-500">
          Streamline Your Day,{" "}
          <span className="text-black">One Task at a Time.</span>
        </h1>
        <p className="text-xl mt-4 text-center md:w-1/3">
          TaskFlow is a simple yet powerful task management app designed to help
          you {""}
          <em className="underline font-semibold">
            organize, prioritize, and achieve
          </em>
          {/* */} more by turning your to-dos into actionable steps, all in one seamless
          experience.
        </p>
        <div className="flex md:gap-14">
          <Button variant="solid" color="primary" size="lg">
            Sign Up
          </Button>
          <Button variant="bordered" color="secondary" size="lg">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
