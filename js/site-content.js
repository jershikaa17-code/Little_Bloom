/*
 * All school details shown on the page live here. This is SAMPLE content:
 * replace names, prices, timings and contact details with the school's own.
 * Colours: pink | blue | green | purple | yellow | mint (match the hero artwork).
 */
window.SITE = {
  school: {
    name: 'LittleBloom Preschool',
    phone: '+91 98247 38022',
    email: 'littlebloom@gmail.com',
    address: '27 Race Course Road, R.S. Puram, Coimbatore 641002, Tamil Nadu',
    hours: 'Mon–Fri 8:00 am – 6:00 pm · Sat 9:00 am – 1:00 pm',
    since: 2014
  },

  about: {
    eyebrow: 'About LittleBloom',
    title: ['Childhood, given the', 'attention', 'it deserves'],
    lead: 'LittleBloom is built around one belief: young children think, learn and grow through play, conversation and hands-on discovery, not worksheets. Our days are unhurried, on purpose.',
    tag: 'Play-based · Montessori-inspired',
    ctaPrimary: 'Discover Our Approach',
    ctaSecondary: 'See Our Programs',

    philosophy: {
      eyebrow: 'Our Philosophy',
      title: ['Children learn by doing,', 'not', 'by being told'],
      text: [
        'We set up each classroom so children can choose their own work — a puzzle, a paintbrush, a stack of blocks — and follow it for as long as it holds their attention. Teachers watch closely and step in with a question or a gentle nudge, not an instruction.',
        'Curiosity, we have found, is a better teacher than any worksheet. Our role is simply to protect the time and space for it.'
      ],
      quote: 'Curiosity is a better teacher than any worksheet.'
    },

    day: {
      eyebrow: 'A Day at LittleBloom',
      title: ['Mornings move', 'slowly', 'on purpose'],
      lead: 'There is no bell rushing children from one thing to the next. Here is roughly how a day unfolds.',
      items: [
        { time: 'Morning', icon: 'sun', color: 'yellow', title: 'Arrival & free choice', text: 'Children settle in at their own pace and choose where to begin — the art table, a book, or a puzzle on the rug.' },
        { time: 'Mid-morning', icon: 'leaf', color: 'green', title: 'Circle & exploration', text: 'Songs, stories and a shared question lead into small-group activities chosen for that day.' },
        { time: 'Midday', icon: 'utensils', color: 'pink', title: 'Meals & rest', text: 'A shared meal, quiet time, and space to recharge before the afternoon begins.' },
        { time: 'Afternoon', icon: 'palette', color: 'blue', title: 'Creative & outdoor play', text: 'Art, movement and time outdoors round out the day, weather permitting.' },
        { time: 'Going home', icon: 'heart', color: 'purple', title: 'Reflection & goodbyes', text: 'A calm wind-down, and a quick word with parents at pick-up about how the day went.' }
      ]
    },

    different: {
      eyebrow: 'What Makes Us Different',
      title: ['Small, by', 'design'],
      items: [
        { n: '01', title: 'Small groups, familiar faces', text: 'Children see the same teachers every day, in groups small enough that quieter kids get noticed too.' },
        { n: '02', title: 'Materials, not worksheets', text: 'Hands-on Montessori materials children can touch, test and repeat until an idea clicks.' },
        { n: '03', title: 'A window into the day', text: 'Parents hear what their child actually did today, through the parent app, not a generic newsletter.' }
      ]
    },

    parents: {
      eyebrow: 'A Note to Parents',
      title: ['This works best as', 'a partnership'],
      text: 'You know your child best. We spend our days with them too. When we talk — at pick-up, through the app, or at a planning meeting — both sides get a fuller picture. That partnership is where the best decisions for your child come from.'
    }
  },

  features: {
    eyebrow: 'Why parents choose us',
    title: ['Everything your child needs to', 'thrive'],
    lead: 'Four promises at the heart of LittleBloom — and a parent app that brings the school day to your phone.',
    pillars: [
      {
        id: 'connected', icon: 'users', color: 'pink',
        title: 'Little moments, shared instantly.',
        text: 'From joyful classroom moments to important reminders, keep up with your child’s day through meaningful updates from teachers.',
        preview: [
          { who: 'Ms. Priya', when: '2:14 PM', note: 'Emma painted a rainbow today 🎨' },
          { who: 'Front desk', when: '9:02 AM', note: 'Checked in safely ✓' }
        ]
      },
      {
        id: 'secure', icon: 'shield', color: 'blue',
        title: 'Care you can feel confident about.',
        text: 'Thoughtful routines and clear communication help families feel reassured throughout the school day.',
        tags: ['Verified pickups', 'CCTV on campus', 'Trained first-aid staff']
      },
      {
        id: 'holistic', icon: 'sprout', color: 'pink',
        title: 'Growing in every little way.',
        text: 'We value the small steps that matter — from building friendships and expressing feelings to discovering new skills and ideas.',
        milestones: [
          { icon: 'book', label: 'Academic' },
          { icon: 'users', label: 'Social' },
          { icon: 'heart', label: 'Emotional' },
          { icon: 'palette', label: 'Creative' }
        ]
      },
      {
        id: 'joyful', icon: 'star', color: 'blue',
        title: 'Every day brings something new.',
        text: 'Music, art, gardening, stories and hands-on exploration turn everyday experiences into opportunities to discover and grow.',
        activities: [
          { icon: 'palette', label: 'Art' },
          { icon: 'leaf', label: 'Gardening' },
          { icon: 'book', label: 'Stories' },
          { icon: 'sparkle', label: 'Music' }
        ]
      }
    ],
    appTitle: 'The LittleBloom parent app',
    appLead: 'A closer, calmer view of your child’s day — built for busy parents.',
    app: [
      { id: 'attendance', icon: 'calendar-check', color: 'green', title: 'Every arrival, accounted for.', text: 'See check-in and pick-up updates so you can stay informed about your child’s school-day transitions.', preview: 'Checked in 8:42 AM · Pick-up 3:15 PM' },
      { id: 'activities', icon: 'palette', color: 'pink', title: 'Little moments worth sharing.', text: 'See photos and notes from creative activities, classroom experiences and outdoor play.', preview: 'Art & Creativity: painted with watercolours today' },
      { id: 'meals', icon: 'utensils', color: 'yellow', title: 'Know what’s on the menu.', text: 'Stay informed about the day’s menu and meal updates shared by the school.', preview: 'Lunch: vegetable pulao & curd — ate most of it' },
      { id: 'learning', icon: 'book', color: 'blue', title: 'Celebrate every new discovery.', text: 'Follow learning milestones and explore the classroom experiences your child enjoys.', preview: 'Milestone: counting to 20, practised today' },
      { id: 'health', icon: 'heart', color: 'pink', title: 'Keep up with daily care.', text: 'View available updates about naps, temperature checks and medicine reminders.', preview: 'Nap 1:00–2:30 PM · Temperature normal' },
      { id: 'messages', icon: 'chat', color: 'mint', title: 'A closer connection with teachers.', text: 'Communicate directly with teachers through a dedicated messaging experience.', preview: '“Emma had a wonderful day!” — Ms. Priya' }
    ]
  },

  programs: {
    eyebrow: 'A learning journey',
    title: ['Little beginnings.', 'Wonderful discoveries.'],
    lead: 'Every stage of childhood brings something new. Our thoughtfully designed programs help children explore, connect and grow at their own pace.',
    items: [
      {
        id: 'playgroup', name: 'Playgroup', age: '1.5–2.5 years', time: '9:00 am – 12:00 pm', ratio: '1:6', color: 'pink', icon: 'star',
        intro: 'A gentle first step into a world of discovery.',
        copy: 'Little ones begin exploring new surroundings, experiencing sensory activities, enjoying movement, and building their first friendships at a comfortable pace.',
        points: ['Sensory play and first friendships', 'Songs, rhymes and movement', 'Settling-in support for parents']
      },
      {
        id: 'nursery', name: 'Nursery', age: '2.5–3.5 years', time: '9:00 am – 12:30 pm', ratio: '1:8', color: 'blue', icon: 'palette',
        intro: 'Curiosity grows through everyday experiences.',
        copy: 'Children develop confidence and independence through hands-on activities, early language experiences, creative exploration, and opportunities to engage with the world around them.',
        points: ['Practical-life and sensorial work', 'Early language and sounds', 'Art, clay and garden time']
      },
      {
        id: 'junior-kg', name: 'Junior KG', age: '3.5–4.5 years', time: '9:00 am – 1:00 pm', ratio: '1:10', color: 'pink', icon: 'chat',
        intro: 'Big questions. Growing confidence.',
        copy: 'Children begin connecting sounds, symbols, numbers and ideas while building communication skills and confidence through meaningful classroom experiences.',
        points: ['Phonics and pre-writing', 'Number sense with Montessori materials', 'Show-and-tell confidence']
      },
      {
        id: 'senior-kg', name: 'Senior KG', age: '4.5–5.5 years', time: '9:00 am – 1:30 pm', ratio: '1:10', color: 'blue', icon: 'book',
        intro: 'Ready for the next exciting chapter.',
        copy: 'Children strengthen early literacy and numeracy, explore new ideas, and develop the confidence and independence that support their transition to primary school.',
        points: ['Reading and early writing', 'Maths, science and the world around us', 'School-readiness and independence']
      }
    ]
  },

  pricing: {
    eyebrow: 'Pricing',
    title: ['More than a school day.', 'A little world of growth.'],
    lead: 'Find a program that fits your family’s routine, with thoughtful care, joyful learning and transparent pricing.',
    currency: '₹',
    period: 'month',
    plans: [
      {
        id: 'half-day', name: 'Half Day', price: 5500, icon: 'sun',
        blurb: 'A gentle morning filled with discovery, creativity and play.',
        time: '9:00 am – 12:30 pm',
        features: ['Healthy mid-morning snack', 'Parent app access', 'Termly parent meetings']
      },
      {
        id: 'full-day', name: 'Full Day', price: 8500, icon: 'calendar-check', popular: true,
        blurb: 'A complete day of learning, nourishing meals and restful moments.',
        time: '9:00 am – 3:30 pm',
        features: ['Morning snack and hot lunch', 'Rest and nap time', 'Parent app with photo updates', 'Weekly activity reports']
      },
      {
        id: 'daycare-plus', name: 'Day Care Plus', price: 11500, icon: 'clock',
        blurb: 'Extended care and enriching experiences for busy family routines.',
        time: '8:00 am – 6:00 pm',
        features: ['All meals and evening snack', 'Extended-day care', 'After-school clubs', 'Priority holiday camps']
      }
    ],
    fees: [
      { label: 'One-time admission fee', value: '₹12,000', note: 'Paid once, at enrolment' },
      { label: 'Sibling discount', value: '10%', note: 'On a second child’s fees' },
      { label: 'Transport', value: 'On request', note: 'Routes shared on enquiry' }
    ]
  },

  contact: {
    eyebrow: 'Get in Touch',
    title: ['We would love to', 'meet', 'you'],
    lead: 'Questions about admissions, timings or fees? Reach out however is easiest — we usually reply within one working day.'
  },

  footer: {
    tagline: 'Nurturing little minds for a brighter future.'
  }
};
