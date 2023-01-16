import {useContext} from "react";
import * as Yup from "yup";
import {Title} from "../../Title/Title";
import {Form} from "../../Form/Form";
import {Input} from "../../Form/Input";
import {Submit} from "../../Form/Submit";
import {Select} from "../../Form/Select";
import {Button} from "../../Form/Button";
import {TodoContext} from "../TodoContext";
import styles from './TaskEdit.module.scss'


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

type Props = {
    id: string
    onClose?: () => void
}
export const TaskEdit = ({id, onClose = () => null}: Props) => {
    const context = useContext(TodoContext)
    const schema = Yup.object().shape({
        // name: Yup.string().trim().matches(/^[A-z0-9\s]*$/).max(255),
        priority: Yup.string().oneOf(priorities.map(i => i.value)),
    });
    let handleSubmit = async (data: any) => {
        console.log(data)
        context.updateTask(data)
        await onClose()
    };

    // useEffect(()=> {
    //
    //
    // }, [id])

    return <div className={styles.TaskEdit}>
        <Title level='h3'>Job Edit</Title>
        <Form schema={schema} onSubmit={handleSubmit} defaultValues={context.readTask(id)}>
            <div>
                <Input name='name' label="Job Name"
                       placeholder="Write an alphanumeric task description in here ..."
                       disabled/>
            </div>
            <div>
                <Select name='priority' label="Job Priority"
                        options={[{label: 'Choose', value: ''}, ...priorities]}
                />
            </div>
            <div className={styles.actions}>
                <Button onClick={onClose}>Cancel</Button>
                <Submit template="save">Save</Submit>
            </div>
        </Form>
    </div>
}