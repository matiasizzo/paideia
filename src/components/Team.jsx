import { Section } from "./common/Section";
import { Card } from "./common/Card";
import { CONTENT } from "../constants/content";

export default function Team() {
  return (
    <Section id="team" bgColor="bg-paideia-cream">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-paideia-primary font-raleway">
            Nosotros
          </h2>
          <p className="text-lg text-paideia-primary-light font-raleway font-light max-w-2xl mx-auto">
            Conoce al equipo de profesionales que te acompañará en tu camino
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONTENT.team.map((member) => (
            <Card key={member.id} className="text-center">
              <div className="space-y-4">
                <div className="text-8xl">{member.image}</div>
                <h3 className="text-2xl font-bold text-paideia-primary font-raleway">
                  {member.name}
                </h3>
                <p className="text-paideia-coral-accent font-raleway font-semibold">
                  {member.role}
                </p>
                <p className="text-paideia-primary-light font-raleway font-light">
                  {member.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
