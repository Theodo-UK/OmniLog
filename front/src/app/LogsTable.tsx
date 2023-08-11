
type Props = {
    logs: {
        id: number;
        datetime_utc: number;
        input_string: string;
        output_string: string;
        total_tokens: number;
    }[]
}
export default function LogsTable({ logs }: Props) {

    return (
        <div className="border bg-white shadow rounded-md p-4 w-full mx-auto">
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date/Time (UTC)</th>
                        <th>Input String</th>
                        <th>Output String</th>
                        <th>Total Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{new Date(log.datetime_utc).toLocaleString()}</td>
                            <td>{log.input_string}</td>
                            <td>{log.output_string}</td>
                            <td>{log.total_tokens}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}