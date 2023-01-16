import {MouseEventHandler, useContext, useEffect, useState} from "react";
import {Title} from "components/Title/Title";
import {Task} from "../Task/Task";
import {Form, Input, Select} from "components/Form";
import * as Yup from "yup";
import {TodoContext} from "../TodoContext";
import {Dialog} from "../../Dialog/Dialog";
import {TaskEdit} from "../TaskEdit/TaskEdit";
import {Confirmation} from "../../Confirmation/Confirmation";
import {ITask} from "../../../types/Task";
import styles from './TaskList.module.scss'

const priorities = [{
    label: 'Urgent',
    value: 'urgent'
}, {
    label: 'Regular',
    value: 'regular'
}, {
    label: 'Trivial',
    value: 'trivial'
}]

const sorting =
    (list: ITask[], field = 'name') => {
        console.log(field)
        const orderLevel = {urgent: 0, regular: 1, trivial: 2}
        if (field === 'priority') {
            console.log('priority')
            list.sort((a, b) => orderLevel[a.priority] - orderLevel[b.priority])
        } else {
            list.sort((a, b) => a.name.localeCompare(b.name))
        }
        return [...list]
    }
export const TaskList = () => {
    const context = useContext(TodoContext)
    const schema = Yup.object().shape({});
    const [order, setOrder] = useState('priority')
    const [filter, setFilter] = useState({name: '', priority: ''})
    const [list, setList] = useState<ITask[]>([])
    const [isDelete, setDelete] = useState<string>('')
    const [isEdit, setEdit] = useState<string>('')

    const handleAction: MouseEventHandler<HTMLButtonElement> = (e) =>
        (e.currentTarget.dataset['action'] === 'delete')
            ? setDelete(e.currentTarget.dataset['id'] || '')
            : setEdit(e.currentTarget.dataset['id'] || '')

    const handleSort: MouseEventHandler<HTMLTableCaptionElement> = (e) =>
        setOrder(e.currentTarget.dataset['field'] || '')

    let handleFilter = async (data: any) => setFilter(data)

    useEffect(() => {
        // console.log('useEffect x')
        if (context?.list?.length)
            setList(sorting(context.list.filter(i =>
                i.name.toLowerCase().includes(filter.name.toLowerCase())
                &&
                i.priority.includes(filter.priority.toLowerCase())), order))
    }, [filter, order, context.list])

    return <>
        <Title level='h3'>Job List</Title>
        <div data-testid="filter" className={styles.TaskList}>
            <Form schema={schema} onChange={handleFilter}>
                <div className={styles.filter}>
                    <div>
                        <Input name='name'
                               placeholder="Job Name"
                               data-testid="filter.name"/>
                    </div>
                    <div>
                        <Select name='priority'
                                options={[{label: 'Priority (all)', value: ''}, ...priorities]}
                                data-testid="filter.priority"
                        />
                    </div>
                </div>
            </Form>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th data-testid="sort.name" data-field='name' onClick={handleSort}>Name</th>
                    <th data-testid="sort.priority" data-field='priority' onClick={handleSort}>Priority</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {list.map((i) => <Task
                    key={i.id}
                    data={i}
                    onAction={handleAction}
                />)}
                </tbody>
            </table>
        </div>

        {isDelete && <Confirmation
            onConfirm={() => context.deleteTask(isDelete) && setDelete('')}
            onCancel={() => setDelete('')}
            title="Are you sure you want to delete it?"
            confirmText="Delete"
            cancelText="Cancel"/>}
        {isEdit &&
            <Dialog>
                <TaskEdit id={isEdit} onClose={() => setEdit('')}/>
            </Dialog>}
    </>
}
