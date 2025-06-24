const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen px-5 md:px-20 py-10 text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Who are we */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Who are we?</h2>
          <p>
            CV, popularly known as EasyTech by our fans on Instagram was
            kick-started as a portal for all-things VTU, including
            handwritten/printed notes collected and curated from the best
            lecturers around. CV also provides a huge databank of question
            papers and solutions and highlights important questions amongst
            them.
          </p>
        </div>

        {/* What we do */}
        <div>
          <h2 className="text-2xl font-bold mb-4">What we do?!</h2>

          {/* Workshops */}
          <h3 className="text-xl font-semibold mb-2">Workshops</h3>
          <p className="mb-6">
            CV also conducts weekly workshops that offer valid certificates to
            make sure that every student inculcates the ability to think out of
            the box and are exposed to the corporate world and graduate with the
            necessary skillset. The workshops focus on topics that are current
            in modern technology and the growing economy.
          </p>

          {/* Internships */}
          <h3 className="text-xl font-semibold mb-2">Internships</h3>
          <p>
            CV has partnered with several companies ranging from startups to
            well-established MNCs providing a unique interning experience which
            equips students with a wide spectrum of skills and not-to-mention,
            also provides stipend! This unique partnership aims to facilitate
            students to graduate corporate-ready!
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">
            We began our journey through Instagram where most of you know us and
            this website, a new face for EasyTech enables us to continue being
            your saviour for all things VTU!
          </p>
          <p>We’re here to hear you!</p>
          <p className="mt-2 font-semibold">Instagram handle</p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t text-sm text-gray-500">
          Copyright © 2025 CV
        </div>
      </div>
    </div>
  );
};

export default AboutUs;