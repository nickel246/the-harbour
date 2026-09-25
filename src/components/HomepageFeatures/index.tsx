import type {ReactNode} from 'react';
import {useMemo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type PortTag = 'Mod Support' | 'Multiplayer' | 'Enhanced Graphics' | 'HD Textures' | 'Widescreen' | 'Native PC';

type Port = {
  name: string;
  team?: string;
  docsPath?: string;
  downloadsUrl?: string;
};

type GameItem = {
  title: string;
  imagePath: string;
  ports: Port[];
};

const GameList: GameItem[] = [
  {
    title: 'The Legend of Zelda: Ocarina of Time',
    imagePath: '/img/games/oot.webp',
    ports: [
      {
        name: 'Ship of Harkinian',
        team: 'Harbour Masters',
        docsPath: '/docs/z64',
        downloadsUrl: 'https://github.com/HarbourMasters/shipwright/releases/latest',
      },
    ],
  },
  {
    title: 'The Legend of Zelda: Majora\'s Mask',
    imagePath: '/img/games/mm.webp',
    ports: [
      {
        name: '2Ship2Harkinian',
        team: '2Ship2Harkinian',
        docsPath: '/docs/z64',
        downloadsUrl: 'https://github.com/2ship2harkinian/2ship2harkinian/releases/latest',
      },
    ],
  },
  {
    title: 'Super Mario 64',
    imagePath: '/img/games/sm64.webp',
    ports: [
      {
        name: 'GhostShip',
        team: 'Harbour Masters',
        downloadsUrl: 'https://github.com/HarbourMasters/ghostship/releases/latest',
      },
    ],
  },
  {
    title: 'Mario Kart 64',
    imagePath: '/img/games/mariokart.webp',
    ports: [
      {
        name: 'Spaghetti Kart',
        team: 'Harbour Masters',
        downloadsUrl: 'https://github.com/HarbourMasters/SpaghettiKart/releases/latest',
      },
    ],
  },
  {
    title: 'Banjo-Kazooie',
    imagePath: '/img/games/banjokazooie.webp',
    ports: [
      {
        name: 'Lighthouse',
        team: 'IsleOPorts',
        downloadsUrl: 'https://github.com/IsleOPorts/Lighthouse/releases/latest'
      },
    ],
  },
  {
    title: 'Starfox 64',
    imagePath: '/img/games/starfox.webp',
    ports: [
      {
        name: 'Starship',
        team: 'Harbour Masters',
        downloadsUrl: 'https://github.com/HarbourMasters/Starship/releases/latest',
      },
    ],
  },
  {
    title: 'Paper Mario 64',
    imagePath: '/img/games/papermario.webp',
    ports: [
      {
        name: 'Paperboat',
        team: 'Harbour Masters',
        downloadsUrl: 'https://github.com/HarbourMasters/PaperBoat/releases/latest',
      },
    ],
  },
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  /*for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }*/
  return shuffled;
}

function PortBadge({tag}: {tag: PortTag}) {
  return <span className={styles.portBadge}>{tag}</span>;
}

function PortItem({port}: {port: Port}) {
  return (
    <div className={styles.portItem}>
      <div className={styles.portHeader}>
        <h4 className={styles.portName}>{port.name}</h4>
        <h5 className={styles.portTeam}>{"By "+port.team}</h5>
        {/* <div className={styles.portTags}>
          {port.tags.map((tag, idx) => (
            <PortBadge key={idx} tag={tag} />
          ))}
        </div> */}
      </div>
      <div className={styles.portButtons}>
         {port.downloadsUrl && (
           <Link
             className="button button--primary button--sm"
             to={port.downloadsUrl}>
             Downloads
           </Link>
         )}
         {port.docsPath && (
           <Link
             className="button button--secondary button--sm"
             to={port.docsPath}>
             Docs
           </Link>
         )}
       </div>
    </div>
  );
}

function GameCard({game}: {game: GameItem}) {
  // Resolve against baseUrl so the images work when the site is served
  // from a subpath (GitHub Pages: /the-harbour/).
  const imageUrl = useBaseUrl(game.imagePath);

  return (
    <div className={clsx('col col--4', styles.gameCard)}>
      <div className={styles.gameCardInner}>
        <div className={styles.gameImage}>
          <img src={imageUrl} alt={game.title} />
        </div>
        <div className={styles.gameContent}>
          {/* <Heading as="h3" className={styles.gameTitle}>{game.title}</Heading> */}
          <div className={styles.portsList}>
            {game.ports.map((port, idx) => (
              <PortItem key={idx} port={port} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  // Shuffle ports for each game on page load to prevent bias
  const shuffledGameList = useMemo(() => {
    return GameList.map(game => ({
      ...game,
      ports: shuffleArray(game.ports),
    }));
  }, []);

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {shuffledGameList.map((game, idx) => (
            <GameCard key={idx} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
