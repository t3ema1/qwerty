export interface Meeting {
    meetingName: string;
    meetingType: string;
    description: string;
    meetingLocation: string;
    meetingLink: string;
    attendeeUsernames: string[];
    announcementDate: Date;
    meetingDate: Date;
}