import PeopleCarousel from './PeopleCarousel'

export default function BirthdayCarousel({ birthdays }) {
  const people = birthdays?.map(b => ({ ...b, sublabel: b.date }))
  return <PeopleCarousel people={people} eyebrow="Birthday" ctaLabel="Recognise" seeMoreLabel="See more birthdays" />
}
