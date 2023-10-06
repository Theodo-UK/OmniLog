import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { Button } from "./Button";
import { ButtonIcon } from "./ButtonIcon";

type PopupProps = {
    triggerIcon: IconDefinition;
    title: string;
    children: ReactNode;
    onValidate: () => void;
    validateText: string;
    cancelText: string;
};

export const Popup = ({
    triggerIcon,
    title,
    children,
    onValidate,
    validateText,
    cancelText,
}: PopupProps) => {
    const [open, setOpen] = useState(false);

    const onRedClick = () => setOpen(false);
    const onBlueClick = () => {
        setOpen(false);
        onValidate();
    };

    return (
        <>
            <ButtonIcon onClick={() => setOpen(true)} icon={triggerIcon} />
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <CustomTransition>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </CustomTransition>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <CustomTransition>
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:flex sm:items-start mt-3 text-center sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-8">{children}</div>
                                    </div>
                                    <div className="bg-gray-50 gap-2 px-4 py-3 sm:flex sm:justify-end sm:px-6">
                                        <Button
                                            colour="red"
                                            onClick={onRedClick}
                                        >
                                            {cancelText}
                                        </Button>
                                        <Button
                                            colour="blue"
                                            onClick={onBlueClick}
                                        >
                                            {validateText}
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </CustomTransition>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

const CustomTransition = ({ children }: { children: ReactNode }) => (
    <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        {children}
    </Transition.Child>
);
