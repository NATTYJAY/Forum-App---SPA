<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'reply'=>$this->body,
            'created_at'=>$this->created_at->diffForHumans(),
            'user'=>$this->user->name,
            'question_slug'=> $this->question->slug,
            'user_id'=>$this->user_id
        ];
    }
}
