import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: '300'})

export const metadata = {
  title: 'Nearby:Me',
  description: 'Collegium contest~',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
      {children}
      </body>
    </html>
  )
}
