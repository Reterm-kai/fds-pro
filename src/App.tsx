import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'
import { MantineProvider } from '@mantine/core'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <div className={styles.root}>
        <div className={styles.logoContainer}>
          <a href="https://vite.dev" target="_blank" className={styles.link}>
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className={styles.link}>
            <img
              src={reactLogo}
              className={`${styles.logo} ${styles.react} ${styles.logoReactAnimated}`}
              alt="React logo"
            />
          </a>
        </div>
        <h1 className={styles.title}>Vite + React</h1>
        <div className={styles.card}>
          <button
            className={styles.button}
            onClick={() => setCount(count => count + 1)}
          >
            count is {count}
          </button>
          <p className={styles.description}>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={styles.readTheDocs}>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </MantineProvider>
  )
}

export default App
