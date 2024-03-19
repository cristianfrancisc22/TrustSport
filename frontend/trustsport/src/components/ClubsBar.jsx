

import { Flex, Box, Image, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

// Import club images
import Dinamo from '../img/liga1 clubs/dinamo.webp';
import FCSB from '../img/liga1 clubs/fcsb.webp';
import Rapid from '../img/liga1 clubs/rapid.webp';
import CFR_CLUJ from '../img/liga1 clubs/cfr.webp';
import CSU_Craiova from '../img/liga1 clubs/craiova.webp';
import FCU_Craiova from '../img/liga1 clubs/u-craiova-1948.webp';
import Farul from '../img/liga1 clubs/farul-constanta.webp';
import Voluntari from '../img/liga1 clubs/voluntari-2021.webp';
import Otelul from '../img/liga1 clubs/_otelul-galati.webp';
import Poli_Iasi from '../img/liga1 clubs/609-CSMS-Iasi-logo.webp';
import Petrolul from '../img/liga1 clubs/petrolul.webp';
import Sepsi from '../img/liga1 clubs/sepsi.webp';
import U_Cluj from '../img/liga1 clubs/u-cluj.webp';
import Hermannstadt from '../img/liga1 clubs/hermanstadt.webp';
import UTA from '../img/liga1 clubs/uta.webp';
import Botosani from '../img/liga1 clubs/botosani.webp';
// Import other club images similarly...

const clubs = [
  { name: 'Dinamo', image: Dinamo, link: '/stiri/dinamo' },
  { name: 'FCSB', image: FCSB, link: '/stiri/fcsb' },
  { name: 'Rapid', image: Rapid, link: '/stiri/rapid' },
  { name: 'CFR Cluj', image: CFR_CLUJ, link: '/stiri/cfr_cluj' },
  { name: 'CSU Craiova', image: CSU_Craiova, link: '/stiri/csu_craiova' },
  { name: 'FC U Craiova 1948', image: FCU_Craiova, link: '/stiri/fcu_craiova' },
  { name: 'Farul Constanta', image: Farul, link: '/stiri/farul_constanta' },
  { name: 'Voluntari 2021', image: Voluntari, link: '/stiri/voluntari' },
  { name: 'Otelul Galati', image: Otelul, link: '/stiri/otelul' },
  { name: 'Poli Iasi', image: Poli_Iasi, link: '/stiri/poli_iasi' },
  { name: 'Petrolul', image: Petrolul, link: '/stiri/petrolul' },
  { name: 'Sepsi', image: Sepsi, link: '/stiri/sepsi' },
  { name: 'U Cluj', image: U_Cluj, link: '/stiri/u_cluj' },
  { name: 'Hermannstadt', image: Hermannstadt, link: '/stiri/hermannstadt' },
  { name: 'UTA Arad', image: UTA, link: '/stiri/uta_arad' },
  { name: 'Botosani', image: Botosani, link: '/stiri/botosani' },
];

const ClubItem = ({ club }) => (
  <ChakraLink as={Link} to={club.link} _hover={{ textDecoration: 'none' }}>
    <Box
      w={['30px', '40px', '50px']}
      h={['40px', '50px', '60px']}
      alignItems="center"
      justifyContent="center"
      _hover={{ borderBottom: '2px solid red' }}
      m="2"
    >
      <Image src={club.image} alt={club.name} />
    </Box>
  </ChakraLink>
);

const ClubsBar = () => (
  <Flex wrap="wrap" justify="center" p="4" mt="2" maxW="100%">
    {clubs.map((club, index) => (
      <ClubItem key={index} club={club} />
    ))}
  </Flex>
);

export default ClubsBar;

