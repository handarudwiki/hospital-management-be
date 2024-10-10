import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class TimeScheduleResponse {
  id: string;
  week_day: string;
  start_time: string;
  end_time: string;
  duration: string;
  user: UserResponse;
  week_num: string;
}

export function toTimeScheduleResponse(data: any): TimeScheduleResponse {
  return {
    id: data.id,
    week_day: data.week_day,
    start_time: data.start_time,
    end_time: data.end_time,
    duration: data.duration,
    user: toUserResponse(data.user),
    week_num: data.week_num,
  };
}
