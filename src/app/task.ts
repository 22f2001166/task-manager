export class Task {
    constructor(
      public id: number,
      public title: string,
      public completed: boolean,
      public time: string,
      public priority: string,
      public notified?: boolean
    ) {}
  }
  