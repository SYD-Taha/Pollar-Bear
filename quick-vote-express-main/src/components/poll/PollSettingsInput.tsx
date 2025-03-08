
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { PollSettings } from "@/types/poll";

interface PollSettingsInputProps {
  settings: {
    allowMultipleSelections: boolean;
    requireParticipantNames: boolean;
    votingSecurity: "ip" | "session";
    expiresIn: "1hour" | "1day" | "1week";
  };
  onSettingChange: <K extends keyof PollSettings>(key: K, value: PollSettings[K]) => void;
  showAdvancedSettings: boolean;
  setShowAdvancedSettings: (show: boolean) => void;
}

export const PollSettingsInput = ({ 
  settings,
  onSettingChange,
  showAdvancedSettings,
  setShowAdvancedSettings
}: PollSettingsInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="multiple-selections" className="text-sm text-gray-600">
            Allow selection of multiple options
          </label>
          <Switch
            id="multiple-selections"
            checked={settings.allowMultipleSelections}
            onCheckedChange={(checked) => onSettingChange("allowMultipleSelections", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="participant-names" className="text-sm text-gray-600">
            Require participant names
          </label>
          <Switch
            id="participant-names"
            checked={settings.requireParticipantNames}
            onCheckedChange={(checked) => onSettingChange("requireParticipantNames", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="expires-in" className="text-sm text-gray-600">
            Poll Duration
          </label>
          <Select 
            value={settings.expiresIn}
            onValueChange={(value) => onSettingChange("expiresIn", value as "1hour" | "1day" | "1week")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1hour">1 hour</SelectItem>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="text-sm text-[#9b87f5] hover:text-[#7E69AB]"
        >
          Show advanced settings
        </button>

        {showAdvancedSettings && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Voting Security
              </label>
              <Select 
                value={settings.votingSecurity} 
                onValueChange={(value) => onSettingChange("votingSecurity", value as "ip" | "session")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ip">One vote per IP address</SelectItem>
                  <SelectItem value="session">One vote per browser session (Coming Soon...)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

