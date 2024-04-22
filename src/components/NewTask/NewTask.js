import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  
  const { isLoading, error, sendRequest: sendTaskRequest }= useHttp();

  const createTask= (taskText, taskData)=>{
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: 'https://react-http-efc68-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
    },
     createTask.bind(null, taskText) // it is build in js which allows us to pre-configure that function-
     //1st argument u pass to bind allows you to set the this keyword in the to-be-executed function-
     // 2nd argument will be the 1st argument recieved by to be bind function
    );

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
