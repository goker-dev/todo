import * as Yup from "yup";
import {Title} from "../../Title/Title";
import {Form} from "../../Form/Form";
import {Input} from "../../Form/Input";
import {Submit} from "../../Form/Submit";
import {Select} from "../../Form/Select";
import styles from './TaskForm.module.scss'
import {useContext} from "react";
import {TodoContext} from "../TodoContext";


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

export const TaskForm = () => {
    const context = useContext(TodoContext)
    const schema = Yup.object().shape({
        name: Yup.string().trim().matches(/^[A-z0-9\s]*$/).max(255),
        priority: Yup.string().oneOf(priorities.map(i => i.value)),
    });
    let handleSubmit = async (data: any) => {
        console.log(data)
        context.createTask(data)
    };

    return <div className={styles.TaskForm}>
        <Title level='h3'>Create New Job</Title>
        <Form schema={schema} onSubmit={handleSubmit}>
            <div className={styles.formInline}>
                <div>
                    <Input name='name' label="Job Name"
                           placeholder="Write an alphanumeric task description in here ..."
                           data-testid="create.name"/>
                </div>
                <div>
                    <Select name='priority' label="Job Priority"
                            options={[{label: 'Choose', value: ''}, ...priorities]}
                            data-testid="create.priority"
                    />
                </div>
                <div>
                    <label>&nbsp;</label>
                    <Submit data-testid="create.submit"> + Create</Submit>
                </div>
            </div>
        </Form>
    </div>
}