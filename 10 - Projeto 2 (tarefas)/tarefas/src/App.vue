<template>
    <div id="app">
        <h1>Tarefas</h1>

		<TaskProgress :progress="progress"> </TaskProgress>

		<NewTask @taskAdded = "addTask($event)"></NewTask>

        <TaskGrid 
			:tasks="tasks"
			@task-deleted="deleteTask($event)"
			@task-state-change="toggleTaskState($event)"
			></TaskGrid>
    </div>
</template>

<script>

import TaskGrid from './components/TaskGrid';
import NewTask from './components/NewTask';
import TaskProgress from './components/taskProgress';

export default {
    components: {TaskGrid, NewTask, TaskProgress},
    data(){
        return {
            tasks:[]
        }
	},
	methods:{
		addTask(task){
			//Funções para comparar se a task já foi adicionada.

			//Essa função retorna V OU F.
			const sameName = t => t.name === task.name

			//Estou fazendo um filtro, pegando todos elementos da lista tasks e comparando com a task que está sendo adicionada,
			// se o tamanho do array resultante for 0,
			// ou seja, nenhum elemento tem o mesmo nome da task que voce quer adicionar.
			//Significa que esse valor é realmente novo

					//Cuidado, para filter, em um JSON, aspas smples '' e diferente de aspas duplas ""
			const reallyNew = this.tasks.filter(sameName).length == 0;


			if(reallyNew){
                this.tasks.push({
                    name: task.name,
                    pending: task.pending || true
                })
 
            }
		},
		deleteTask(i){
			this.tasks.splice(i, 1);
		},
		toggleTaskState(i){
			this.tasks[i].pending = !this.tasks[i].pending;
		}
	},
	computed:{
		progress(){
			const total = this.tasks.length;

			const tasksDone = t => t.pending === false;
			const done = this.tasks.filter(tasksDone).length;


			return Math.round((done/total) * 100) || 0

		} 
	},
	watch:{
/*  // PROBLEMA: QUANDO EU NAO ADICIONO NEM DELETO ELEMENTOS WATCH NAO CONSEGUE DETECTAR MUDANÇA DENTRO DOS OBJETOS DESSE ARRAY 
		tasks() { //SETA AS INFORMAÇÕES para localstorage, MAS NAO LE ELAS.
			localStorage.setItem('tasks', JSON.stringify(this.tasks))
		}
*/ 	// solução: transforma tasks em objeto e usa o DEEP + HANDLERy
		tasks:{
			deep: true,  //fazer um watch profundo, verifica tudo não só adição e deleção
			handler(){
				localStorage.setItem('tasks', JSON.stringify(this.tasks))		
			}
		}
	},
	created(){ //LE AS INFORMAÇÕES SETADAS PELO WATCH
		const json = localStorage.getItem('tasks');
		const array = JSON.parse(json)

		this.tasks = Array.isArray(array) ? array : []
/*
		if(Array.isArray(array)){
			this.tasks = array;
		}else{
			this.tasks = [];
		}
*/
		
	}
}
</script>

<style>
	body {
		font-family: 'Lato', sans-serif;
		background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115));
		color: #FFF;
	}

	#app {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	#app h1 {
		margin-bottom: 5px;
		font-weight: 300;
		font-size: 3rem;
	}
</style>
