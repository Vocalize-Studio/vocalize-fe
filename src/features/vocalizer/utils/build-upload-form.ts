type TrackSource = File | string | undefined | null;

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

export function buildUploadFormData(values: {
  user_id: number | null;
  vocal_audio: File;
  instrumental_audio: TrackSource;
  reference_audio: TrackSource;
}) {
  const fd = new FormData();

  fd.append("user_id", String(values.user_id));

  fd.append("vocal_audio", values.vocal_audio);

  if (values.instrumental_audio instanceof File) {
    fd.append("instrumental_audio", values.instrumental_audio);
  } else if (isNonEmptyString(values.instrumental_audio)) {
    fd.append("instrumental_youtube_url", values.instrumental_audio.trim());
  }

  if (values.reference_audio instanceof File) {
    fd.append("reference_audio", values.reference_audio);
  } else if (isNonEmptyString(values.reference_audio)) {
    fd.append("reference_youtube_url", values.reference_audio.trim());
  }

  fd.append("auto_start_ml_job", "true");

  return fd;
}
