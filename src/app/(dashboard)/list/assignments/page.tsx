import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Assignment = {
    id: string;
    subject: string;
    class: number;
    teacher: string;
    dueDate: string;
} 

const columns = [
    {
        header: "Subject Name",
        accessor: "name",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className:"hidden md:table-cell",
    },
    {
        header: "Due Date",
        accessor: "dueDate",
        className:"hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    }
];

const AssignmentListPage = () => {
    const renderRow = (item: Assignment) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-customPurpleLight">
            <td className="flex items-center gap-4 p-4"> {item.subject}</td>
            <td>{item.class}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.dueDate}</td>
            <td>
                <div className="gap-2 flex items-center">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-customSky">
                            <Image src="/edit.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && <button className="w-7 h-7 flex items-center justify-center rounded-full bg-customPurple">
                        <Image src="/delete.png" alt="" width={16} height={16} />
                    </button>}
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/*TOP*/}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">
                    All Exams
                </h1>
                <div className="gap-4 flex flex-col md:flex-row items-center w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-customYellow">
                            <Image src='/filter.png' alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-customYellow">
                            <Image src='/sort.png' alt="" width={14} height={14} />
                        </button>
                        { role === "admin" &&
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-customYellow">
                                <Image src='/plus.png' alt="" width={14} height={14} />
                            </button>}
                    </div>
                </div>
            </div>

            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={assignmentsData} />

            {/*PAGINATION*/}
            <Pagination />
        </div>
    )
}

export default AssignmentListPage;