// project specific tasks with same name will take precedence

const projectTasks = {
    'hello': 'echo \'Hello Drome Project Task\''
};

module.exports = () => {
    return {
        tasks: projectTasks
    };
};
