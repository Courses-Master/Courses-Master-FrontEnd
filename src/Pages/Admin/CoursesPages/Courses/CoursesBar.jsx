import React from 'react';
import Button from '@/ReuseableComponents/Button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AddCourse from '../AddCourse';

export default function CoursesBar() {
    return (
        <div className="bg-[#E3E8EF] flex justify-between pr-3 items-center shadow-xl shadow-[#cfcfcf]">
            <h1 className="text-4xl w-fit p-5">Courses</h1>

            <Dialog>
                <DialogTrigger  >
                    <Button
                    type={"button"}
                        text="Add Course"
                        className="w-[100px] mr-5 mt-1 h-10 cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-md py-1"
                    />
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                    </DialogHeader>

                    <AddCourse />
                </DialogContent>
            </Dialog>
        </div>
    );
}
