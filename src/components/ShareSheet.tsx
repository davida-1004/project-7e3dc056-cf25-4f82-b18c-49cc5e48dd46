import { toast } from "sonner";
import { X } from "lucide-react";
import { useTrip } from "@/context/TripContext";
import { buildShareText, buildShareUrl } from "@/lib/personalizedTrip";

interface ShareSheetProps {
  onClose: () => void;
}

const ShareSheet = ({ onClose }: ShareSheetProps) => {
  const { answers } = useTrip();
  const shareUrl = buildShareUrl(answers);
  const shareText = buildShareText(answers);

  const copyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    toast.success("여행 요약과 링크를 함께 복사했어요! ✅");
  };

  const handleWebShare = async () => {
    if (!navigator.share) {
      toast("이 기기에서는 시스템 공유가 지원되지 않아요. 링크 복사를 사용해주세요.");
      return;
    }

    try {
      await navigator.share({
        title: "허니문 여행 플랜",
        text: shareText,
        url: shareUrl,
      });
    } catch {
      toast("공유를 취소했거나 지금은 열 수 없어요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[430px] bg-card rounded-t-3xl p-6 pb-10 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-6">친구나 파트너에게 공유해요 💌</h2>

        <div className="rounded-2xl border border-border bg-muted/40 p-4 mb-4">
          <p className="text-sm whitespace-pre-line text-foreground leading-relaxed">{shareText}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWebShare}
            className="w-full h-14 rounded-2xl font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FEE500", color: "#191919" }}
          >
            시스템 공유 열기
          </button>
          <button
            onClick={copyLink}
            className="w-full h-14 rounded-2xl bg-muted text-foreground font-semibold text-lg hover:bg-muted/80 transition-colors"
          >
            링크 복사하기
          </button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          링크만이 아니라 선택한 나라, 도시, 기간 요약도 같이 전달돼요
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ShareSheet;
