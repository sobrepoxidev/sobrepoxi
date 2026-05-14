import HomeContainer from './home/HomeContainer'

type tParams = Promise<{ locale: string }>

export default async function HomePage({ params }: { params: tParams }) {
  const { locale } = await params
  return <HomeContainer locale={locale} />
}
