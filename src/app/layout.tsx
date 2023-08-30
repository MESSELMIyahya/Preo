import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import MainDataContextProvider from '@/contexts/maindata'
import { getServerSession } from 'next-auth'
import { GetUserTheme } from '@/libs/user/inde'
import { getColor } from '@/libs'
import { AuthOptions } from './api/auth/[...nextauth]/route'
import AuthProvider from '@/components/AuthProvider'


export const metadata: Metadata = {
  title: 'Preo',
  description: 'Preo is Your Home To Post',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getServerSession(AuthOptions);
  let colorTheme = ["#06b6d4", "#3b82f6"];
  let colornum  = '0';
  if(user){
    const userTheme = await GetUserTheme(user.user);
    colornum = Number(userTheme.theme)
    if(userTheme) colorTheme = getColor(Number(userTheme.theme));
    console.log(colorTheme);
  }

  return (
    <html lang="en">
      <body style={{backgroundImage:`linear-gradient(to right,${colorTheme[0]},${colorTheme[1]})`}}>
        <AuthProvider>
          <MainDataContextProvider>
          <Header session={user} colorNumber={colornum} state={'done'} />
          {children}
          </MainDataContextProvider>
        </AuthProvider>
        </body>
    </html>
  )
}
