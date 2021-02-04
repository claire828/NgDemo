
import {IItemStruct} from '../def/defTask'

export class TaskDB{

    todoList:IItemStruct[];

    constructor(){
        this.todoList = [];
    }
   

    insertAllData(data:any){
        
    }

    addTask(task:IItemStruct){
        this.todoList.push(task);
    }


    getTask(uuid:string):IItemStruct{
        return this.todoList.find(x=>x.uuid === uuid);
    }

    resetListAfterRemoving(){
        this.todoList = this.todoList.filter(x=>!x.isRemove);
    }

    completeAllTasks(complete:boolean){
        this.todoList.map(x=>x.complete = complete);
    }

}