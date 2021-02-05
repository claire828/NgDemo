import { Injectable } from '@angular/core';
import {IItemStruct,Page} from './def/defTask'
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {TaskDB} from './db/taskDB';
import faker from 'faker';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private taskDB:TaskDB;
  constructor(private apollo:Apollo) {
    this.taskDB = new TaskDB();
    this.getListFromServer();
   }


  getListFromServer(){
    this.apollo
    .watchQuery({
      query: gql`
        query {
          list {uuid status name}
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      try {
        if(result?.data?.list) {
          this.taskDB.insertAllData(result.data.list);
          console.log(result)
        }
      } catch(e) {
        console.log(e.message)
      }
    })
  }
  
  addItem(name:string):void{
    let task:IItemStruct = {
      name,
      uuid:`${new Date().getTime()}.${faker.random.uuid()}`,
      complete:false,
      isRemove:false,
      isFocus:false
    };
    let query=`mutation {
      create(uuid: "${task.uuid}", name: "${name}") {
        id uuid status name }
    }`
    this.apollo.mutate({
      mutation: gql`${query}`
    }).subscribe(result => {
      this.taskDB.addTask(task);
    }, error => {
      console.log(`failed request:[addItem]`);
    });
  }


  updateTaskName(task:IItemStruct, newName:string){
    let newTask = Object.assign({},task);
    newTask.name = newName;
    this.apollo.mutate({
      mutation: gql`${this.generateUpdateQuery(newTask)}`
    }).subscribe(result => {
      this.taskDB.getTask(task.uuid).name = newName;
    }, error => {
      console.log(`failed request:[updateTaskName]`);
    });
  }


  async completeTask(task:IItemStruct, complete:boolean, skip:boolean=false){
    let newTask = Object.assign(task,{});
    newTask.complete = complete;
    this.apollo.mutate({
      mutation: gql`${this.generateUpdateQuery(newTask)}`
    }).subscribe(result => {
      if(skip) return;
      this.taskDB.getTask(task.uuid).complete = complete;
    }, error => {
      console.log(`failed request:[completeTask]`);
    });
  }

  async completeAllTasks(complete:boolean){
    let clone = Object.assign(this.taskDB.todoList,{});
    for (const task of clone) {
      task.complete = complete;
      await this.completeTask(task,complete);
    }
    this.taskDB.todoList = clone;
  }

  private generateUpdateQuery(newTask:IItemStruct):string{
    return `mutation {
      update(uuid: "${newTask.uuid}", name: "${newTask.name}", status:${Number(newTask.complete)}) {
        id uuid status name }
    }`;
  }

   async removeTask(task:IItemStruct, skip:boolean=false){
    let query=`mutation {
      delete(uuid: "${task.uuid}") {id uuid status name }
    }`;
    this.apollo.mutate({
      mutation: gql`${query}`
    }).subscribe(result => {
      if(skip) return;
      this.taskDB.getTask(task.uuid).isRemove = true;
      this.taskDB.resetListAfterRemoving();
    }, error => {
      console.log(`failed request:[add item]`);
    });
  }

  async removeAllCompleteTask(){
    let clone = Object.assign(this.taskDB.todoList,{});
    const list = clone.filter(x=>x.complete);
    for (const task of list) {
      delete clone[clone.indexOf(task)];
      await this.removeTask(task,true);
    }
    this.taskDB.todoList = clone.filter(x=>x);
  }


  get List():IItemStruct[]{
    return this.taskDB.todoList;
  }




}
