/* 
  psy21d 
  Apche 2.0 licensed
*/
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { i18n } from "@/i18n/i18n";
import { Button } from "@workspace/ui/components/button";
import { t } from "@lingui/core/macro";
import { Switch } from "@workspace/ui/components/switch";
import { Label } from "@workspace/ui/components/label";
import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { setTheme } = useTheme();

  const {
    language,
    theme,
    backgroundMusic,
    voiceGuides,
    breathingPace,
    analyticsEnabled,
    units,
    weekStart,
    voiceVolume,
    musicVolume,
    hapticsEnabled,
  } = useSelector((state: RootState) => state.preferences);

  const switchLang = (newLang: string) => {
    i18n.activate(newLang);
    dispatch(setPreference({ key: "language", value: newLang }));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">{t`Settings`}</h1>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">{t`General`}</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>{t`Units`}</Label>
              <div className="flex gap-2">
                <Button
                  variant={units === "metric" ? "default" : "outline"}
                  onClick={() =>
                    dispatch(setPreference({ key: "units", value: "metric" }))
                  }
                >
                  {t`Metric`}
                </Button>
                <Button
                  variant={units === "imperial" ? "default" : "outline"}
                  onClick={() =>
                    dispatch(setPreference({ key: "units", value: "imperial" }))
                  }
                >
                  {t`Imperial`}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>{t`Week starts on`}</Label>
              <div className="flex gap-2">
                <Button
                  variant={weekStart === "monday" ? "default" : "outline"}
                  onClick={() =>
                    dispatch(
                      setPreference({ key: "weekStart", value: "monday" }),
                    )
                  }
                >
                  {t`Monday`}
                </Button>
                <Button
                  variant={weekStart === "sunday" ? "default" : "outline"}
                  onClick={() =>
                    dispatch(
                      setPreference({ key: "weekStart", value: "sunday" }),
                    )
                  }
                >
                  {t`Sunday`}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t`Language`}</h2>
            <Select value={language} onValueChange={switchLang}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">{t`Sounds`}</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>{t`Voice`}</Label>
              <input
                type="range"
                min={0}
                max={100}
                value={voiceVolume}
                onChange={(e) =>
                  dispatch(
                    setPreference({
                      key: "voiceVolume",
                      value: Number(e.target.value),
                    }),
                  )
                }
                className="w-2/3 accent-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>{t`Music`}</Label>
              <input
                type="range"
                min={0}
                max={100}
                value={musicVolume}
                onChange={(e) =>
                  dispatch(
                    setPreference({
                      key: "musicVolume",
                      value: Number(e.target.value),
                    }),
                  )
                }
                className="w-2/3 accent-black"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">{t`App Preferences`}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t`Colour Scheme`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Choose your preferred color scheme`}
                </p>
              </div>
              <Select
                value={theme}
                onValueChange={(v) => {
                  setTheme(v);
                  dispatch(setPreference({ key: "theme", value: v }));
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t`App Icon`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Customize your app icon`}
                </p>
              </div>
              <Button variant="outline" onClick={() => {}}>
                {t`Change`}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t`Background`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Customize your app background`}
                </p>
              </div>
              <Button variant="outline" onClick={() => {}}>
                {t`Change`}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t`Background Music`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Play calming background music during sessions`}
                </p>
              </div>
              <Switch
                checked={backgroundMusic}
                onCheckedChange={(v) =>
                  dispatch(setPreference({ key: "backgroundMusic", value: v }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t`Voice Guides`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Enable voice guidance during breathing exercises`}
                </p>
              </div>
              <Switch
                checked={voiceGuides}
                onCheckedChange={(v) =>
                  dispatch(setPreference({ key: "voiceGuides", value: v }))
                }
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">{t`Privacy`}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t`Analytics`}</Label>
                <p className="text-sm text-muted-foreground">
                  {t`Help us improve by sharing anonymous usage data`}
                </p>
              </div>
              <Switch
                checked={analyticsEnabled}
                onCheckedChange={(v) =>
                  dispatch(setPreference({ key: "analyticsEnabled", value: v }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
