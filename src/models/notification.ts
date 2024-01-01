export type Notification = {
  title: string;
  description: string;
  userId: number;
  userName: string | null;
  createdDate: string;
  isRead: boolean;
};
