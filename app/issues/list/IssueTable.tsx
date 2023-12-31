import { Link, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  order: "asc" | "desc";
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

export default function IssueTable({ searchParams, issues }: Props) {
  const order = searchParams.order === "asc" ? "desc" : "asc";

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <TableColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                searchParams.order === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.order === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </TableColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block sm:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden sm:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];
export const columnNames = columns.map((column) => column.value);
