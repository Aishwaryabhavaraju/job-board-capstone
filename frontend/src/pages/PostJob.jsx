import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

export default function PostJob() {
  return (
    <div
        className="
            max-w-5xl
            mx-auto
            px-4
            sm:px-6
            py-8
        "
    >
      <PageHeader
        title="Post a New Job"
        subtitle="Fill in the details below to publish a new job."
      />

      <Card>
        <form className="space-y-6">

          <Input
            label="Job Title"
            placeholder="Frontend Developer"
          />

          <Input
            label="Company"
            placeholder="TechNova"
          />

          <Input
            label="Location"
            placeholder="Hyderabad"
          />

          <Select label="Job Type">
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Remote</option>
            <option>Contract</option>
          </Select>

          <Input
            label="Salary"
            type="number"
            placeholder="500000"
          />

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              rows="6"
              className="w-full border rounded-lg p-3"
              placeholder="Job description..."
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Requirements
            </label>

            <textarea
              rows="5"
              className="w-full border rounded-lg p-3"
              placeholder="Requirements..."
            />
          </div>

          <div
            className="
                flex
                flex-col
                sm:flex-row
                justify-end
                gap-3
            "
          >
            <Button variant="secondary">
              Cancel
            </Button>

            <Button>
              Publish Job
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}