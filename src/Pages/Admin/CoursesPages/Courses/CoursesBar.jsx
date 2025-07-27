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

export default function CoursesBar({ setCourseAdded }) {
    return (
        <div className="bg-gray-100 flex justify-between pr-3 items-center shadow-sm drop-shadow-[0_0px_0px_rgba(0,0,0,0.25)]">
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

                    <AddCourse setCourseAdded={setCourseAdded} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
