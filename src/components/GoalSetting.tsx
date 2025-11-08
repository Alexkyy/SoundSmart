import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Target, Edit2, Check, X } from 'lucide-react';

interface GoalSettingProps {
  currentGoal: number;
  onGoalChange: (goal: number) => void;
}

export function GoalSetting({ currentGoal, onGoalChange }: GoalSettingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(currentGoal.toString());

  const handleSave = () => {
    const newGoal = parseFloat(tempGoal);
    if (!isNaN(newGoal) && newGoal > 0) {
      onGoalChange(newGoal);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempGoal(currentGoal.toString());
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Monthly Spending Goal
        </CardTitle>
        <CardDescription>Set your target spending limit</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal-input">Goal Amount</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-600">$</span>
                <Input
                  id="goal-input"
                  type="number"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  className="flex-1"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1" size="sm">
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1" size="sm">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Current Goal</p>
              <p className="text-3xl">${currentGoal.toLocaleString()}</p>
            </div>
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
