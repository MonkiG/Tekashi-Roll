export default function AboutUs (): JSX.Element {
  return (
    <>
      <section className="text-tertiary-700">
        <div className="container mx-auto flex flex-col px-5 py-8 md:items-center">
          <div className="mb-8 flex w-full flex-col text-left lg:text-center">
            <h2 className="bg-primary-100 text-primary-800 md:w-84 title-font mb-4 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-widest md:mx-auto">Acerca de nosotros</h2>
            <h1 className="font-heading title-font mx-auto mb-6 text-center text-6xl font-semibold leading-none tracking-tighter text-black lg:max-w-2xl">Tekashi Roll.</h1>
            <p className="font-regular text-tertiary-600 mx-auto text-lg leading-relaxed md:max-w-xl">Somos un restaurante de comida Japonesa combinada con la cultura de la comida Mexicana, nuestros platillos se basan en conservan lo tradicional de japón y hacer que tu paladar se sorprenda con ese toque mexicano unico que te encantara.</p>
            <a href="#" className="hover:bg-primary-700 focus:shadow-outline mt-6 flex w-full transform items-center rounded-lg bg-red-400 px-6 py-2 text-center font-semibold text-black ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:outline-none focus:ring-2 md:mx-auto md:w-48 md:justify-center"> Ordena Ahora</a>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="font-heading title-font mb-4 rounded-lg bg-yellow-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black md:mx-auto md:w-64">Por que elegir Tekashi Roll?</h2>
            <p className="font-heading mt-2 text-3xl font-semibold leading-8 tracking-tight text-gray-900 sm:text-4xl">Sabemos que hay muchos restaurantes estilos japones.</p>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">Aqui te explicamos porque elegir Tekashi Roll.</p>
          </div>
          <div className="mt-10">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-700 text-white">
                    <i className="ph-code text-3xl"></i>
                  </div>
                  <p className="font-heading ml-16 text-lg font-bold leading-6 text-gray-700">Facilidad para ordenar</p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500">Gracias a nuestra propia Aplicacion Webb, ahora ordenar tu comida preferida esta al alcance de tu dispositivo electronico favorito.</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-700 text-white">
                    <i className="ph-file-js text-3xl"></i>
                  </div>
                  <p className="font-heading ml-16 text-lg font-bold leading-6 text-gray-700">Envio a domicilio</p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500">Obten tu orden hasta tu domicilio, gracias a nuestros repartidores dentro de la localidad!.</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-700 text-white"><i className="ph-money text-3xl"></i></div>
                  <p className="font-heading ml-16 text-lg font-bold leading-6 text-gray-700">Metodo de pago</p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500">Con Tekashi Roll puedes pagar ya sea en efectivo o en linea para que sea de tu comodidad.</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-700 text-white">
                    <i className="ph-shield-check text-3xl"></i>
                  </div>
                  <p className="font-heading ml-16 text-lg font-bold leading-6 text-gray-700">Ver el status de tu pedido</p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500">Nuestra pagina permite que conozcas como va tu orden, hasta el momento de que la recibes, de esta manera conoceras el tiempo que le falta de llegada, para que no te desesperes :).</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="lg:text-center">
            <h2 className="font-heading bg-secondary-100 text-secondary-800 title-font mb-4 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-widest md:mx-auto md:w-40">Testimonios</h2>
          </div>
          <h1 className="title-font mb-12 text-center text-3xl font-medium text-gray-900">Las palabras de nuestros clientes</h1>
          <div className="-m-4 flex flex-wrap">
            <div className="w-full p-4 md:w-1/2">
              <div className="bg-tertiary-100 border-tertiary-300 h-full rounded-lg border p-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mb-4 block h-5 w-5 text-gray-400" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="mb-6 leading-relaxed">Cerca de toda la zona de bahia de banderas, es el mejor sushi que he probado, aparte de tener un lugar acogedor para la familia lo recomiendo al cien por ciento.</p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://dummyimage.com/107x107" className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center" />
                  <span className="flex flex-grow flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Abner</span>
                    <span className="text-sm text-gray-500">Cliente Frecuente</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <div className="bg-tertiary-100 border-tertiary-300 h-full rounded-lg border p-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mb-4 block h-5 w-5 text-gray-400" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="mb-6 leading-relaxed">Sin duda de los mejores Drangon Roll que he probado. He ido a otros sushis pero a este volveria sin duda.</p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://dummyimage.com/107x107" className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center" />
                  <span className="flex flex-grow flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Nemesis Sierra Aranda</span>
                    <span className="text-sm text-gray-500">Cliente Frecuente</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 py-12 sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8">
        <div className="mx-auto max-w-screen-xl p-8">
          <div className="lg:text-center">
            <h3 className="mb-12 text-3xl font-extrabold leading-9 text-gray-900">Preguntas Frecuentes</h3>
          </div>
          <div className="mx-auto flex flex-wrap items-start">
            <div className="w-full p-4 md:w-1/2">
              <p className="text-lg font-medium leading-6 text-gray-900">¿Se puede pagar en efectivo?</p>
              <p className="mt-2"></p>
              <p className="text-base leading-6 text-gray-500">Por supuesto, tenemos dos metodos de pago, en efectivo y con tarjeta, siendo que en efectivo el pago maximo que podras realizar sera de $1500 mxn :).</p>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <p className="text-lg font-medium leading-6 text-gray-900">¿El restaurante transmite partidos de futbol?</p>
              <p className="mt-2"></p>
              <p className="text-base leading-6 text-gray-500">En Tekashi Roll podras ver todos los partidos mas emocionantes del momento :D.</p>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <p className="text-lg font-medium leading-6 text-gray-900">¿Cual es la tematica del restaurant?</p>
              <p className="mt-2"></p>
              <p className="text-base leading-6 text-gray-500">Somos un restaurante de comida Japonesa fusionada con la comida mexicana, ven a Tekashi Roll para que pruebes los mejores makis del estado!!.</p>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <p className="text-lg font-medium leading-6 text-gray-900">En donde se encuentran ubicados?</p>
              <p className="mt-2"></p>
              <p className="text-base leading-6 text-gray-500">Nos encontramos ubicados en Altavela, Nayarit, a un costado del parque de futbol!! Visitanoooos!!!.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ordena tu sushi ¡YA!</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="bg-primary-600 hover:bg-primary-700 inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium text-black"> Sign up </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="text-secondary-600 hover:bg-primary-50 inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-5 py-3 text-base font-medium"> Login </a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
