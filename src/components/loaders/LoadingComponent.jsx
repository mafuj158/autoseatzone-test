import { tailspin } from 'ldrs'
tailspin.register()
const LoadingComponent = () => {
    return (

        <div className='flex fixed inset-0 w-full justify-center items-center min-h-screen'>
            <l-tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="black"
            ></l-tailspin>
        </div>
    );
};

export default LoadingComponent;

