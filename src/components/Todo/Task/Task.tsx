import {MouseEventHandler, ReactNode, useContext} from "react";
import styles from './Task.module.scss'
import {Badge} from "../../Badge/Badge";
import {ITask} from "../../../types/Task";
import {Button} from "../../Form";

type Props = {
    data: ITask
    onAction: MouseEventHandler
}
export const Task = ({data, onAction}: Props) => <tr className={styles.Task}>
    <td data-testid="task.name">{data.name}</td>
    <td><Badge template={data.priority}>{data.priority}</Badge></td>
    <td>
        <Button
            data-id={data.id}
            data-action='delete'
            onClick={onAction}
            template="icon"
            title="Delete"
            data-testid="task.delete"
        >
            <i className="icon-trash-empty"/>
        </Button>{' '}
        <Button
            data-id={data.id}
            data-action='edit'
            onClick={onAction}
            template="icon"
            title="Edit"
            data-testid="task.edit"
        >
            <i className="icon-pencil"/>
        </Button>
    </td>
</tr>