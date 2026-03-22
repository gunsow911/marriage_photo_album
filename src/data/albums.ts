export interface Photo {
  id: number
  src: string
  caption?: string
}

export const photos: Photo[] = [
  { id: 1, src: './photos/1.jpg', caption: "test1" },
  { id: 2, src: './photos/2.jpg', caption: "test2" },
  { id: 3, src: './photos/3.jpg', caption: "test3" },
  { id: 4, src: './photos/4.jpg', caption: "test4" },
]
