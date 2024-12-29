import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks,
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 gap-2 grid grid-cols-3">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 font-semibold text-2xl">
                                Pending Tasks
                            </h3>
                            <p className="text-xl mt-2">
                                <span className="mr-2">{myPendingTasks}</span>/
                                <span className="ml-2">
                                    {totalPendingTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 font-semibold text-2xl">
                                In Progress Tasks
                            </h3>
                            <p className="text-xl mt-2">
                                <span className="mr-2">{myProgressTasks}</span>/
                                <span className="ml-2">
                                    {totalProgressTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-500 font-semibold text-2xl">
                                Completed Tasks
                            </h3>
                            <p className="text-xl mt-2">
                                <span className="mr-2">{myCompletedTasks}</span>
                                /
                                <span className="ml-2">
                                    {totalCompletedTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 font-semibold text-xl">
                                My Active Tasks
                            </h3>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Project Name</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks.data.map((task) => (
                                        <tr key={task.id}>
                                            <td className="p-3">{task.id}</td>
                                            <td className="p-3">
                                                <Link
                                                    href={route(
                                                        "project.show",
                                                        task.project.id
                                                    )}
                                                    className="text-white hover:underline"
                                                >
                                                    {task.project.name}
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                <Link
                                                    href={route(
                                                        "task.show",
                                                        task.id
                                                    )}
                                                    className="text-white hover:underline"
                                                >
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                <span
                                                    className={
                                                        "px-3 py-1 text-white rounded-sm " +
                                                        TASK_STATUS_CLASS_MAP[
                                                            task.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        TASK_STATUS_TEXT_MAP[
                                                            task.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {task.due_date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
