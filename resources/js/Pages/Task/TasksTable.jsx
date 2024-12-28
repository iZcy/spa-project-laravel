import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({
    tasks,
    queryParams,
    hideProjectColumn = false,
}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams, {
            preserveState: true,
        });
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc")
                queryParams.sort_direction = "desc";
            else queryParams.sort_direction = "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("task.index"), queryParams, {
            preserveState: true,
        });
    };

    const columns = [
        {
            name: "id",
            sortable: true,
            text: "ID",
        },
        {
            name: "image",
            sortable: false,
            text: "Image",
        },
        {
            name: "name",
            sortable: false,
            text: "Name",
        },
        {
            name: "status",
            sortable: true,
            text: "Status",
        },
        {
            name: "created_at",
            sortable: true,
            text: "Create Date",
        },
        {
            name: "updated_at",
            sortable: true,
            text: "Update Date",
        },
        {
            name: "due_date",
            sortable: true,
            text: "Due Date",
        },
        {
            name: "created_by",
            sortable: false,
            text: "Created By",
        },
        {
            name: "actions",
            sortable: false,
            text: "Actions",
        },
    ];

    if (!hideProjectColumn) {
        const newCol = {
            name: "nomen",
            sortable: false,
            text: "Project Name",
        };

        columns.splice(2, 0, newCol);
    }

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            {columns.map((item) => {
                                return (
                                    <TableHeading
                                        key={item.name}
                                        name={item.name}
                                        sortable={item.sortable}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sort_field={queryParams.sort_field}
                                        sortChanged={sortChanged}
                                    >
                                        {item.text}
                                    </TableHeading>
                                );
                            })}
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            {!hideProjectColumn && <th className="p-3"></th>}
                            <th className="p-3">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder={"Task Name"}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="p-3">
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => {
                            return (
                                <tr
                                    key={task.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th className="p-3">{task.id}</th>
                                    <td className="p-3">
                                        <img
                                            className="w-[60px]"
                                            src={task.image_path}
                                            alt=""
                                        />
                                    </td>
                                    <td
                                        className={
                                            "p-3 " +
                                            (hideProjectColumn ? "hidden" : "")
                                        }
                                    >
                                        <Link
                                            href={route(
                                                "project.show",
                                                task.project.id
                                            )}
                                            className="hover:underline"
                                        >
                                            {task.project.name}
                                        </Link>
                                    </td>
                                    <td className="p-3">{task.name}</td>
                                    <td className="p-3">
                                        <span
                                            className={
                                                "px-3 py-1 text-white " +
                                                TASK_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            }
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {task.created_at}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {task.updated_at}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {task.due_date}
                                    </td>
                                    <td className="p-3">
                                        {task.createdBy.name}
                                    </td>
                                    <td>
                                        <Link
                                            href={route("task.edit", task.id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route(
                                                "task.destroy",
                                                task.id
                                            )}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}
