import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
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

    const deleteProject = (id) => {
        if (!window.confirm("Are you sure you want to delete the project?"))
            return;

        router.delete(route("project.destroy", id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            {[
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
                                                    sortable: true,
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
                                            ].map((item) => {
                                                return (
                                                    <TableHeading
                                                        key={item.name}
                                                        name={item.name}
                                                        sortable={item.sortable}
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
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
                                            <th className="p-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
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
                                                            src={
                                                                project.image_path
                                                            }
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className="p-3 text-gray-100 text-nowrap">
                                                        <Link
                                                            href={route(
                                                                "project.show",
                                                                project.id
                                                            )}
                                                            className="hover:underline"
                                                        >
                                                            {project.name}
                                                        </Link>
                                                    </td>
                                                    <td className="p-3">
                                                        <span
                                                            className={
                                                                "px-3 py-1 text-white " +
                                                                PROJECT_STATUS_CLASS_MAP[
                                                                    project
                                                                        .status
                                                                ]
                                                            }
                                                        >
                                                            {
                                                                PROJECT_STATUS_TEXT_MAP[
                                                                    project
                                                                        .status
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
                                                        <button
                                                            onClick={() =>
                                                                deleteProject(
                                                                    project.id
                                                                )
                                                            }
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
