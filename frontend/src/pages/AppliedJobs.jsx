import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    status: "Applied",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeCraft",
    status: "Interview",
  },
];

export default function AppliedJobs() {
  return (
    <div>
      <PageHeader
        title="Applied Jobs"
        subtitle="Track your job applications."
      />

      <div className="space-y-5">
        {jobs.map((job) => (
          <Card key={job.id}>
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p>{job.company}</p>
              </div>

              <div className="flex gap-3 items-center">

                <Badge color="blue">
                  {job.status}
                </Badge>

                <Button variant="outline">
                  View Job
                </Button>

              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
