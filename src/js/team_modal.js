
import * as basicLightbox from 'basiclightbox';
import confetti from 'canvas-confetti';

import vadimUrl from '../images/team_photo/vadim.jpg';
import elenaUrl from '../images/team_photo/elena.jpg';
import arturUrl from '../images/team_photo/artur.jpg';
import artemUrl from '../images/team_photo/artem.jpg';
import ivanUrl from '../images/team_photo/ivan.jpg';
import denisUrl from '../images/team_photo/denis.jpg';
import olexanderUrl from '../images/team_photo/olexander.jpg';
import kristinaUrl from '../images/team_photo/kristina.jpg';
import vitaliyUrl from '../images/team_photo/vitaliy.jpg';
import olenaUrl from '../images/team_photo/olena.jpg';
import goitUrl from '../images/team_photo/goit.jpg';
import dmytroUrl from '../images/team_photo/dmytro.jpg';




 const team = [
    {   photo: `${vadimUrl}`,
        name: 'Vadim',
        role: 'Team-lead',
    },
     {  photo: `${elenaUrl}`,
        name: 'Elena',
        role: 'Scrum-master',
    },
      { photo: `${arturUrl}`,
        name: 'Artur',
        role: 'Developer',
   },
      { photo: `${artemUrl}`,
        name: 'Artem',
        role: 'Developer',
   },
      { photo: `${ivanUrl}`,
        name: `Ivan`,
        role: 'Developer',
   },
      {  photo: `${denisUrl}`,
        name: 'Denis',
        role: 'Developer',
   },
      {  photo: `${olexanderUrl}`,
        name: 'Olexander',
        role: 'Developer',
   },
      { photo: `${kristinaUrl}`,
        name: 'Kristina',
        role: 'Developer',
   },
      { photo: `${vitaliyUrl}`,
        name: 'Vitaliy',
        role: 'Developer',
   },
      { photo: `${olenaUrl}`,
        name: 'Olena',
        role: 'Developer',
   },
     {  photo: `${goitUrl}`,
        name: 'GOIT',
        role: 'School',
   },

      { photo: `${dmytroUrl}`,
        name: 'Dmytro',
        role: 'Developer',
    },
]




const markupTeamCard = team
  .map(({ photo, name, role}) => {
    return `<li class="team-card">
            <a class="team__link" href="${photo}">
            <img src="${photo}" alt="${name}" class="team-photo">
            </a>
            <p class="team-name">${name}</p>
            <p class="team-role">${role}</p>
             </li>`;
  })
  .join('');

const markupTeamModal = `<p class="team-title">OUR<span class="space"></span>TEAM</p>
<ul class="team-wrapper">
${markupTeamCard}
</ul>`;


    
const container = document.querySelector('.footer__team-open-btn');
container.addEventListener('click', openModal);
const modal = basicLightbox.create(markupTeamModal);

function openConfetti() {
confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
})({ particleCount: 300, spread: 200, shapes: ['star'], scalar: 0.5, zIndex: 2000 });
}


function openModal(e) {
  e.preventDefault();
  openConfetti();
  modal.show();
  window.addEventListener('keydown', closeModalHandler);
 
  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
  }
























