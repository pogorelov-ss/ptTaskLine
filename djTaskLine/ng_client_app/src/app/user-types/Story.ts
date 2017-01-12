export class Story {
    created_at:string
    current_state:string
    description:string
    id:number
    labels:Array<any>
    owner_ids:Array<number>
    kind:string
    name:string
    story_type:string
    url:string
    requested_by_id:number
    owned_by_id:number
    requester?:any
    owner?:any
}
