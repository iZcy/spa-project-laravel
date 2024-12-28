import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged,
    children,
}) {
    return (
        <th className="p-3" onClick={(e) => sortChanged(name)}>
            <div
                className={
                    "flex items-center justify-between gap-1 " +
                    (sortable && "cursor-pointer")
                }
            >
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name &&
                                    sort_direction === "asc" &&
                                    "text-white")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (sort_field === name &&
                                    sort_direction === "desc" &&
                                    "text-white")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}
