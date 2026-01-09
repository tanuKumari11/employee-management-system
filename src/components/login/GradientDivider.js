import Greeting from "./Greeting";
import LoginForm from "./LoginForm";

export default function GradientDivider() {
    return (
        <div className="relative w-full min-h-screen flex flex-col lg:flex-row lg:h-screen">
            {/* Left Section - Greeting */}
            <div className="w-full lg:w-1/2 flex-1 lg:h-full flex items-center justify-center p-8 lg:p-0">
                <Greeting />
            </div>

            {/* Vertical Divider with Gradient (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2 z-10">
                <div className="h-full w-1 bg-linear-to-b from-transparent via-blue-400 to-transparent" />
            </div>

            {/* Horizontal Divider (Mobile Only) */}
            <div className="block lg:hidden w-full h-px relative z-10 my-4">
                <div className="w-full h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent" />
            </div>

            {/* Right Section - Login */}
            <div className="w-full lg:w-1/2 flex-1 lg:h-full flex items-center justify-center p-8 lg:p-0">
                <LoginForm />
            </div>
        </div>
    );
}
