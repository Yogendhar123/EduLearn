// Types
import { Course } from './courses';

export interface CartItem {
  courseId: string;
  quantity: number;
  course: Course;
}

// Initial empty cart
export const initialCart: CartItem[] = [];

// Cart utilities
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.course.price * item.quantity), 0);
};