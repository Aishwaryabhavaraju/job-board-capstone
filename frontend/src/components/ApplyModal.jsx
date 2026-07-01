import Button from "./ui/Button";
import { notifySuccess, notifyError } from "../utils/toast";

export default function ApplyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-5">
          Apply for Job
        </h2>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Cover Letter
            </label>

            <textarea
              rows="5"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Resume
            </label>

            <input
              type="file"
              className="w-full"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button>
            Submit Application
          </Button>

        </div>

      </div>

    </div>
  );
}