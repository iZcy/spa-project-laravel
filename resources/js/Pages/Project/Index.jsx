import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams, {
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

        router.get(route("project.index"), queryParams, {
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Image</th>
                                        <th
                                            onClick={(e) => sortChanged("name")}
                                            className="p-3"
                                        >
                                            Name
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                sortChanged("status")
                                            }
                                            className="p-3"
                                        >
                                            Status
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                sortChanged("created_at")
                                            }
                                            className="p-3"
                                        >
                                            Create Date
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                sortChanged("updated_at")
                                            }
                                            className="p-3"
                                        >
                                            Update Date
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                sortChanged("due_date")
                                            }
                                            className="p-3"
                                        >
                                            Due Date
                                        </th>
                                        <th className="p-3">Created By</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="p-3"></th>
                                        <th className="p-3"></th>
                                        <th className="p-3">
                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder={"Project Name"}
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="p-3">
                                            <SelectInput
                                                defaultValue={
                                                    queryParams.status
                                                }
                                                className="w-full"
                                                onChange={(e) =>
                                                    searchFieldChanged(
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Status
                                                </option>
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="in_progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
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
                                    {projects.data.map((project) => {
                                        return (
                                            <tr
                                                key={project.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <th className="p-3">
                                                    {project.id}
                                                </th>
                                                <td className="p-3">
                                                    <img
                                                        className="w-[60px]"
                                                        src={project.image_path}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    {project.name}
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={
                                                            "px-3 py-1 text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="p-3 text-nowrap">
                                                    {project.created_at}
                                                </td>
                                                <td className="p-3 text-nowrap">
                                                    {project.updated_at}
                                                </td>
                                                <td className="p-3 text-nowrap">
                                                    {project.due_date}
                                                </td>
                                                <td className="p-3">
                                                    {project.createdBy.name}
                                                </td>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "project.edit",
                                                            project.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "project.destroy",
                                                            project.id
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
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
