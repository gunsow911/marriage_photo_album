export interface Photo {
  id: number
  src: string
  caption?: string
}

export const photos: Photo[] = [
  { id: 1, src: './photos/1.jpg', caption: "クリスマスでケンタッキーチキン" },
  { id: 2, src: './photos/2.jpg', caption: "菜の花といっしょに" },
  { id: 3, src: './photos/3.jpg', caption: "菜の花といっしょに2" },
  { id: 4, src: './photos/4.jpg', caption: "結婚1か月記念" },
]
